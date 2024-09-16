import { Metadata } from 'next';
import Link from 'next/link';

import { SocialBtn } from '@/components/social-btn';

import { LoginForm } from './_components';

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập vào tài khoản của bạn',
};

const LoginPage = () => {
  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h1 className="mt-8 mb-2 text-2xl lg:text-3xl font-semibold">Chào mừng trở lại!</h1>
        <p className="text-sm text-muted-foreground">Đăng nhập vào tài khoản của bạn</p>
      </div>
      <SocialBtn provider="google" />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-strong"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-sm bg-background text-muted-foreground">Hoặc</span>
        </div>
      </div>
      <LoginForm />
      <div className="flex items-center justify-center">
        <span className="text-sm text-muted-foreground">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="text-primary underline">
            {' '}
            Đăng ký ngay
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
