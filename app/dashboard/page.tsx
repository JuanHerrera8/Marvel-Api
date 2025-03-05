"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import md5 from "md5"

export default function Dashboard() {
    const [characters, setCharacters] = useState<Character[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
    const router = useRouter()

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY
                const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY
                const ts = new Date().getTime().toString()
                const hash = md5(ts + privateKey + publicKey)

                const response = await fetch(
                    `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=20`,
                )
                const data: CharacterResponse = await response.json()
                setCharacters(data.data.results)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching Marvel characters:", error)
                setLoading(false)
            }
        }

        fetchCharacters()
    }, [])

    const handleLogout = () => {
        router.push("/")
    }

    const handleCharacterClick = (character: Character) => {
        setSelectedCharacter(character)
    }

    const closeModal = () => {
        setSelectedCharacter(null)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Personajes de Marvel</h1>
                <button onClick={handleLogout} className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                    Cerrar Sesión
                </button>
            </div>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg bg-white shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Imagen
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Nombre
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Descripción
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {characters.map((character) => (
                                <tr key={character.id} className="hover:bg-gray-50">
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="h-16 w-16 overflow-hidden rounded-full">
                                            <Image
                                                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                                alt={character.name}
                                                width={64}
                                                height={64}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <button
                                            onClick={() => handleCharacterClick(character)}
                                            className="text-blue-600 hover:text-blue-900 hover:underline"
                                        >
                                            {character.name}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="line-clamp-2 text-sm text-gray-500">
                                            {character.description || "No hay descripción disponible."}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedCharacter && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-2xl font-bold">{selectedCharacter.name}</h2>
                            <button
                                onClick={closeModal}
                                className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mb-4 flex justify-center">
                            <Image
                                src={`${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`}
                                alt={selectedCharacter.name}
                                width={300}
                                height={300}
                                className="rounded-lg object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="mb-2 text-lg font-semibold">Descripción:</h3>
                            <p className="text-gray-700">
                                {selectedCharacter.description || "No hay descripción disponible para este personaje."}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}