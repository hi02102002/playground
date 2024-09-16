import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Logo } from '@/components/logo';
import { validateRequest } from '@/utils/server';

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const { user } = await validateRequest();

  if (user) {
    return redirect('/');
  }

  return (
    <div className="min-h-svh grid grid-cols-12">
      <div className="col-span-12  xl:col-span-5 flex items-center justify-center relative  p-4 pt-14">
        <div className="h-14 flex items-center absolute px-4 left-0 top-0">
          <Logo />
        </div>
        <div className="max-w-sm mx-auto w-full ">
          {children}
          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground">
              Bằng việc tiếp tục, bạn đồng ý với{' '}
              <Link className="underline text-primary" href="/terms">
                Điều khoản
              </Link>{' '}
              của chúng tôi và thừa nhận{' '}
              <Link className="underline text-primary" href="/privacy">
                Chính sách bảo mật
              </Link>{' '}
              của chúng tôi.
            </p>
          </div>
        </div>
      </div>
      <div
        className="col-span-7 bg-cover bg-center xl:block hidden"
        style={{
          backgroundImage: 'url(/images/auth-bg.png)',
        }}
      />
    </div>
  );
};

export default Layout;
