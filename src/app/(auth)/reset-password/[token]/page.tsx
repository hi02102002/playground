import { redirect } from 'next/navigation';

import { PATHS } from '@/constants';

import { ResetPasswordForm } from '../_components';

type Props = {
  params: {
    token: string;
  };
};

const ResetPasswordPage = ({ params }: Props) => {
  console.log(params);

  if (!params?.token) {
    return redirect(PATHS.AUTH.RESET_PASSWORD);
  }

  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h1 className="mt-8 mb-2 text-3xl font-semibold">Đặt lại mật khẩu</h1>
        <p className="text-sm text-muted-foreground">
          Nhập mật khẩu mới của bạn để đặt lại mật khẩu
        </p>
      </div>
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
