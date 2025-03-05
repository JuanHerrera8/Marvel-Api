"use client"

import React, { useRef, useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

function login() {

    const captcha = useRef(null);
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [captchaValido, setcaptchaValido] = useState(false)
    const [uservalid, setUservalid] = useState(false)

    const onChange = (value: string | null) => {
        setcaptchaValido(!!value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!captchaValido) {
            Swal.fire({
                icon: "error",
                title: "Captcha Incompleto!",
                text: "Por favor verifique que no es un robot",
            });
            return
        }

        // Validar credenciales
        if (email === "admin@admin.com" && password === "Admin") {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Inicio de sesion exitoso!",
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => {
                router.push("/dashboard")
            }, 1000)
        } else {
            Swal.fire({
                icon: "error",
                title: "Correo o contraseña incorrectos!",
                text: "Por favor verifique sus credenciales",
            });
        }
    }

    return (
        <div className=" max-w-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-6 pt-6 pb-8 mb-4">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h1>
                    <p className="text-gray-600 opacity-45">Bienvenido al portal de salud COOSALUD</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                        Correo Electrónico
                    </label>
                    <input
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="email"
                        placeholder="Correo"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                        Contraseña
                    </label>
                    <input
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <ReCAPTCHA className='mb-6'
                    ref={captcha}
                    sitekey="6Ldvj-kqAAAAABHj1TgJ2xaRnaotB-nxera5xbrN"
                    onChange={onChange}
                />
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign In
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2025 COOSALUD. All rights reserved.
            </p>
        </div>
    )
}
export default login