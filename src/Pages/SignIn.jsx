import SignInForm from "../Components/SignInForm";

const SignIn = () => {
  return (
    <div className="flex h-screen items-center justify-between">
      <img
        src="/images/register-signin.jpg"
        alt=""
        className="h-full w-[45%]"
        loading="lazy"
      />
      <SignInForm />
    </div>
  );
};

export default SignIn;
