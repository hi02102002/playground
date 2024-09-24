import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';

import Toolbar from './_components/toolbar';

type Props = {};

const ActiveScene = dynamic(() => import('./_components/active-scene'), {
  ssr: false,
  loading: () => (
    <div className="h-svh w-full flex items-center justify-center flex-col gap-2">
      <Loader2 className="animate-spin w-6 h-6" />
      <span>Đang tải...</span>
    </div>
  ),
});

const AppPage = (props: Props) => {
  return (
    <div className="h-svh w-full select-none">
      <ActiveScene />
      <Toolbar />
    </div>
  );
};

export default AppPage;
