'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
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
import { client } from '@/server/client';
import { LoginSchema, LoginSchemaType } from '@/validator-schema';

export const LoginForm = () => {
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (json: LoginSchemaType) => {
      const res = await client.api.auth.login.$post({
        json,
      });

      const data = await res.json();

      return data;
    },
    onSuccess: (res) => {
      toast.success(res.message || 'Đăng nhập thành công');
    },
    onError: (error: any) => {
      toast.error(error?.data?.message || 'Đăng nhập thất bại');
    },
  });

  const handleSubmit = (data: LoginSchemaType) => {
    loginMutation.mutate(data);
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
                  <Input {...field} placeholder="example@gmail.com" />
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
                <div className="flex items-center gap-2 justify-between">
                  <FormLabel required>Mật khẩu</FormLabel>
                  <Link href="/reset-password" className="text-sm text-muted-foreground">
                    Quên mật khẩu?
                  </Link>
                </div>
                <FormControl>
                  <Input {...field} placeholder="••••••••" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" className="w-full">
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
};
