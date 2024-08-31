import "server-only";

import { OpenAPIHono } from "@hono/zod-openapi";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { ofetch } from "ofetch";

import { google, lucia } from "@/lib/lucia";
import {
  createAccount,
  getAccountByProviderUserId,
} from "@/server/services/oauth";
import { createUser } from "@/server/services/user";
import { ContextVariables, GoogleUserRes } from "@/server/types";
import { absoluteUrl } from "@/utils";
import { db } from "@/db";

export const googleCallback = new OpenAPIHono<{
  Variables: ContextVariables;
}>().get("/auth/google/callback", async (c) => {
  const code = c.req.query("code")?.toString() ?? null;
  const state = c.req.query("state")?.toString() ?? null;
  const redirect = c.req.query("redirect")?.toString() ?? "/";

  const storedState = getCookie(c).google_oauth_state ?? null;

  const codeVerifier = getCookie(c).google_code_verifier ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !codeVerifier
  ) {
    return c.redirect(
      absoluteUrl(`/login?error=${encodeURIComponent("Lỗi xác thực.")}`),
    );
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);

    const googleUser = await ofetch<GoogleUserRes>(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );

    if (!googleUser.verified_email) {
      return c.redirect(
        absoluteUrl(
          `/login?error=${encodeURIComponent("Email chưa được xác thực.")}`,
        ),
      );
    }

    const account = await getAccountByProviderUserId(googleUser.id);

    if (account && account?.providerId !== "google") {
      return c.redirect(
        absoluteUrl(
          `/login?error=${encodeURIComponent("Tài khoản này đã được liên kết với một tài khoản khác.")}`,
        ),
      );
    }

    if (account) {
      const session = await lucia.createSession(account.userId, {});

      const cookie = lucia.createSessionCookie(session.id);

      setCookie(c, cookie.name, cookie.value, {
        ...cookie.attributes,
        sameSite: "Strict",
      });

      deleteCookie(c, "google_oauth_state");
      deleteCookie(c, "google_code_verifier");

      return c.redirect(redirect);
    }

    const user = await db.transaction(async (trx) => {
      const user = await createUser(
        {
          email: googleUser.email,
          username: googleUser.name,
          avatarUrl: googleUser.picture,
          emailVerified: googleUser.verified_email,
        },
        trx,
      );

      await createAccount(
        {
          providerId: "google",
          providerUserId: googleUser.id,
          userId: user.id,
        },
        trx,
      );

      return user;
    });

    const session = await lucia.createSession(user.id, {});

    const cookie = lucia.createSessionCookie(session.id);

    setCookie(c, cookie.name, cookie.value, {
      ...cookie.attributes,
      sameSite: "Strict",
    });

    deleteCookie(c, "google_oauth_state");
    deleteCookie(c, "google_code_verifier");

    return c.redirect(redirect);
  } catch (error) {
    return c.redirect(
      absoluteUrl(
        `/login?error=${encodeURIComponent("Đã có lỗi xảy ra. Vui lòng thử lại.")}`,
      ),
    );
  }
});
