import { render } from 'jsx-email';
import { ComponentProps } from 'react';

import { env } from '@/env.mjs';
import { EmailVerification, PasswordReset } from '@/mail-templates';

export enum EmailTemplate {
  EmailVerification = 'EmailVerification',
  PasswordReset = 'PasswordReset',
}

export type PropsMap = {
  [EmailTemplate.EmailVerification]: ComponentProps<typeof EmailVerification>;
  [EmailTemplate.PasswordReset]: ComponentProps<typeof PasswordReset>;
};

const getMailTemplate = async <T extends EmailTemplate>(template: T, props: PropsMap[T]) => {
  switch (template) {
    case EmailTemplate.EmailVerification:
      return {
        subject: 'Xác thực email',
        html: await render(
          <EmailVerification {...(props as PropsMap[EmailTemplate.EmailVerification])} />,
        ),
      };
    case EmailTemplate.PasswordReset:
      return {
        subject: 'Đặt lại mật khẩu',
        html: await render(<PasswordReset {...(props as PropsMap[EmailTemplate.PasswordReset])} />),
      };
    default:
      throw new Error('Invalid template');
  }
};

export const sendMail = async <T extends EmailTemplate>({
  props,
  template,
  to,
}: {
  template: T;
  props: PropsMap[T];
  to: string;
}) => {
  const { subject, html } = await getMailTemplate(template, props);

  if (!env.ENABLED_SEND_MAIL) {
    console.log(
      `Send mail template ${template} to ${to} with subject: ${subject}, props: ${JSON.stringify(props)}`,
    );

    return;
  }
};
