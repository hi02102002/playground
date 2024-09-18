'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

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
import { cn } from '@/lib/utils';
import { client } from '@/server/client';
import { EmailSchema } from '@/validator-schema';

export const ForgotPasswordForm = () => {
  const form = useForm<{
    email: string;
  }>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(
      z.object({
        email: EmailSchema,
      }),
    ),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await client.api.auth['reset-password'].$post({
        json: {
          email,
        },
      });

      const data = await res.json();

      return data;
    },
    onSuccess: (res) => {
      toast.success(res.message || 'Vui lòng kiểm tra email để đặt lại mật khẩu.');
    },
    onError: (error: any) => {
      toast.error(error?.data?.message || ERROR_MESSAGE);
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    forgotPasswordMutation.mutate(data.email);
  });

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="email@gmail.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-sm text-muted-foreground">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="text-primary underline">
              {' '}
              Đăng ký ngay
            </Link>
          </p>
        </div>
        <Button className="w-full" isLoading={forgotPasswordMutation.isPending}>
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
