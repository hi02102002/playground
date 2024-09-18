'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ERROR_MESSAGE, PATHS } from '@/constants';
import { useRouter } from '@/hooks';
import { cn } from '@/lib/utils';
import { client } from '@/server/client';
import { ResetPasswordSchema, ResetPasswordSchemaType } from '@/validator-schema/reset-password';

export const ResetPasswordForm = () => {
  const params = useParams();
  const router = useRouter();

  const form = useForm<ResetPasswordSchemaType>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(ResetPasswordSchema),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (json: ResetPasswordSchemaType) => {
      const res = await client.api.auth['reset-password'][':token'].$post({
        json,
        param: {
          token: (params?.token as string) || '',
        },
      });

      const data = await res.json();

      return data;
    },
    onSuccess: (res) => {
      toast.success(res.message || 'Đặt lại mật khẩu thành công.');

      router.push(PATHS.AUTH.LOGIN);
    },
    onError: (error: any) => {
      toast.error(error?.data?.message || ERROR_MESSAGE);
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    resetPasswordMutation.mutate(data);
  });

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>Mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="••••••••"
                    type="password"
                    disabled={resetPasswordMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>Xác nhận mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="••••••••"
                    type="password"
                    disabled={resetPasswordMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button className="w-full" isLoading={resetPasswordMutation.isPending}>
          Đặt lại mật khẩu
        </Button>
        <Link
          href={PATHS.AUTH.LOGIN}
          className={cn(
            buttonVariants({
              variant: 'outline',
              className: 'w-full',
            }),
          )}
        >
          Quay lại
        </Link>
      </form>
    </Form>
  );
};
