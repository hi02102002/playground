import { ForgotPasswordForm } from './_components';

const ForgotPasswordPage = () => {
  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h1 className="mt-8 mb-2 text-3xl font-semibold">Quên mật khẩu?</h1>
        <p className="text-sm text-muted-foreground">
          Chúng tôi sẽ gởi bạn liên kết để đặt lại mật khẩu
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;
