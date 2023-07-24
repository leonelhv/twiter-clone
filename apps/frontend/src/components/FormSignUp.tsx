import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    name: string
    lastName: string
    username: string
    email: string
    password: string
    confirm_password: string
    phone: string
};



export default function FormSignUp () {


    const { register, handleSubmit } = useForm<Inputs>();


    const onSubmit = handleSubmit((data) => {
        fetch('http://localhost:3000/api/register', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(res => res.json()).then(data => {
            console.log(data)
        })
            .catch(err => {
                console.log(err)
            })
    });



    return (
        <div className="container">

            <form className="text-black w-full" onSubmit={void onSubmit}>
                <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                <div className="flex gap-4">
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        placeholder="Name"
                        {...register("name", { required: true })}
                    />
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        placeholder="Last name"
                        {...register("lastName", { required: true })}
                    />
                </div>
                <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    placeholder="Username"
                    {...register("username", { required: true })}
                />

                <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    placeholder="Email"
                    {...register("email", { required: true })}
                />

                <div className="flex gap-4">
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        placeholder="Password"
                        {...register("password", { required: true })}
                    />
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        placeholder="Confirm Password"
                        {...register("confirm_password", { required: true })}
                    />
                </div>
                <input
                    type="tel" // Change from "phone" to "tel"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    placeholder="Phone"
                    {...register("phone", { required: true })}
                />

                <button
                    type="submit"
                    className="w-full bg-violet-900 text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                >
                    Create Account
                </button>
            </form>
        </div>
    );
}
