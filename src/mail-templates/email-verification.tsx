import { Text } from 'jsx-email';

export type EmailVerificationProps = {
  code: string;
};

export const EmailVerification = ({ code }: EmailVerificationProps) => {
  return <Text>{`Mã xác thực của bạn là: ${code}`}</Text>;
};
