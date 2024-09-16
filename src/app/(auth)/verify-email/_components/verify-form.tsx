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
import { cn } from '@/lib/utils';
import { client } from '@/server/client';
import { VerificationCodeSchema, VerificationCodeSchemaType } from '@/validator-schema';

export const VerifyEmailForm = () => {
  const router = useRouter();
  const form = useForm<VerificationCodeSchemaType>({
    defaultValues: {
      code: '',
    },
    resolver: zodResolver(VerificationCodeSchema),
  });

  const verifyEmailMutation = useMutation({
    mutationFn: async (json: VerificationCodeSchemaType) => {
      const res = await client.api.auth['email-verification'].$post({
        json,
      });

      return res;
    },
    onSuccess: (res: any) => {
      toast.success(res.message || 'Xác thực email thành công.');

      router.push(PATHS.DASHBOARD);
    },
    onError: (error: any) => {
      toast.error(error?.data?.message || ERROR_MESSAGE);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await client.api.auth.logout.$post();

      return res;
    },
    onSuccess: () => {
      router.push(PATHS.HOME);
    },
  });

  const handleSubmit = (data: VerificationCodeSchemaType) => {
    verifyEmailMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel required>Mã xác thực</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nhập mã xác thực" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button
          type="submit"
          className="w-full"
          isLoading={verifyEmailMutation.isPending}
          disabled={verifyEmailMutation.isPending || logoutMutation.isPending}
        >
          Xác thực
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={verifyEmailMutation.isPending || logoutMutation.isPending}
        >
          Gửi lại mã xác thực
        </Button>
        <span
          className={cn('text-sm text-muted-foreground inline-block', {
            'pointer-events-none': verifyEmailMutation.isPending || logoutMutation.isPending,
          })}
        >
          Đăng nhập tài khoản khác?{' '}
          <span
            className="underline text-primary cursor-pointer"
            onClick={() => {
              logoutMutation.mutate();
            }}
          >
            Đăng xuất ngay
          </span>
        </span>
      </form>
    </Form>
  );
};
