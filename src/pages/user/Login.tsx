import { login } from "@/apis/user";
import FormInput from "@/components/form-input";
import LoadingButton from "@/components/loading-button";
import RequireMark from "@/components/require-mark";
import { Card, CardContent } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { CONSTANT } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { useUserContext } from "@/userContext";
import { LoginInfo, LoginSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setToken, setUser } = useUserContext();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (userInfo) => (
      setToken(userInfo.token), setUser(userInfo.user), navigate("/home")
    ),
  });

  const handlerOnSubmit = (values: LoginInfo) => {
    mutate(values);
  };

  return (
    <div
      className={cn("flex flex-col gap-6 items-center justify-center h-full")}
    >
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              className="p-6 md:p-8"
              onSubmit={form.handleSubmit(handlerOnSubmit)}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">
                    {CONSTANT.WELECOME_BACK}
                  </h1>
                  <p className="text-balance text-muted-foreground">
                    {CONSTANT.LOGIN_TO_YOUR_ACCOUNT}
                  </p>
                </div>

                <FormInput
                  label={<RequireMark>{CONSTANT.USERNAME}</RequireMark>}
                  name="username"
                  className="w-72"
                />

                <FormInput
                  label={<RequireMark>{CONSTANT.PASSWORD}</RequireMark>}
                  name="password"
                  className="w-72"
                  type="password"
                />

                <LoadingButton
                  type="submit"
                  className="w-full"
                  loading={isPending}
                >
                  Login
                </LoadingButton>

                {/* <div className="flex items-center space-x-2">
                  <Checkbox />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {CONSTANT.REMEMBER_LOGIN_ACCOUNT}
                  </label>
                </div> */}
              </div>
            </form>
          </Form>

          <div className="relative hidden bg-muted md:block">
            <img
              src="/03.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        COPYRIGHT BY <a href="/about">SNIQA</a>
      </div>
    </div>
  );
};

export default Login;
