export function generateAvatar() {
    const random_code_character = Math.floor(Math.random() * 826) + 1
    return `https://rickandmortyapi.com/api/character/avatar/${random_code_character}.jpeg`
}
