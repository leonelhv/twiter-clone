

export default function FormSignUp () {
    return (
        <div className="container max-w-sm mx-auto">
            <div className=" text-black w-full">
                <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="fullname"
                    placeholder="Full Name" />

                <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="email"
                    placeholder="Email" />

                <input
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="password"
                    placeholder="Password" />
                <input
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="confirm_password"
                    placeholder="Confirm Password" />

                <button
                    type="submit"
                    className="w-full bg-violet-900 text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                >Create Account</button>



            </div>


        </div>
    )
}
