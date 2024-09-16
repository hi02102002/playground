import { Metadata } from 'next';

import { VerifyEmailForm } from './_components';

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập vào tài khoản của bạn',
};

const VerifyEmailPage = () => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="mt-8 mb-2 text-2xl lg:text-3xl font-semibold">Xác thực email</h1>
        <p className="text-sm text-muted-foreground">
          Vui lòng xác thực email để hoàn tất quá trình đăng ký
        </p>
      </div>
      <VerifyEmailForm />
    </div>
  );
};

export default VerifyEmailPage;
