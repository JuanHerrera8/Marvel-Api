interface Character {
    id: number
    name: string
    description: string
    thumbnail: {
        path: string
        extension: string
    }
}

interface CharacterResponse {
    data: {
        results: Character[]
    }
}