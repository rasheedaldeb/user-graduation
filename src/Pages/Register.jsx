import RegisterForm from "../Components/RegisterForm";

const Register = () => {
  return (
    <div className="flex items-center justify-center pt-20">
      <img
        src="/images/register-signin.jpg"
        alt=""
        className="h-[123vh] w-[45%]"
        loading="lazy"
      />
      <RegisterForm />
    </div>
  );
};

export default Register;
