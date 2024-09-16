'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
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
import { client } from '@/server/client';
import { RegisterSchema, RegisterSchemaType } from '@/validator-schema';

export const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
      username: '',
    },
    resolver: zodResolver(RegisterSchema),
  });

  const registerMutation = useMutation({
    mutationFn: async (json: RegisterSchemaType) => {
      const res = await client.api.auth.register.$post({
        json,
      });

      return res;
    },
    // @ts-expect-error - this res is not a json
    onSuccess: ({ message }) => {
      toast.success(message || 'Đăng ký thành công vui lòng kiểm tra email để xác nhận tài khoản.');
      router.push(PATHS.AUTH.VERIFY_EMAIL);
    },
    onError: (error: any) => {
      toast.error(error?.data?.message || ERROR_MESSAGE);
    },
  });

  const handleSubmit = (data: RegisterSchemaType) => {
    registerMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="example@gmail.com"
                    disabled={registerMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>Họ và tên</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Vo Hoang A"
                    disabled={registerMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
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
                    disabled={registerMutation.isPending}
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
                  <Input {...field} placeholder="••••••••" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" className="w-full" isLoading={registerMutation.isPending}>
          Tạo tài khoản
        </Button>
      </form>
    </Form>
  );
};
