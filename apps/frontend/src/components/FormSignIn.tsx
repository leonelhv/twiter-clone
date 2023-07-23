

export default function FormSignIn () {
    return (
        <div className="container max-w-sm mx-auto">
            <div className=" text-black w-full">
                <h1 className="mb-8 text-3xl text-center">Sign In</h1>
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

                <button
                    type="submit"
                    className="w-full bg-violet-900 text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                >Login</button>

            </div>


        </div>
    )
}
