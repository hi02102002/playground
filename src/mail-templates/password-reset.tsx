import { link } from 'fs';
import { Text } from 'jsx-email';

export type PasswordResetProps = {
  link: string;
};

export const PasswordReset = ({ link }: PasswordResetProps) => {
  return <Text>{`Đây là link đặt lại mật khẩu của bạn: ${link}`}</Text>;
};
