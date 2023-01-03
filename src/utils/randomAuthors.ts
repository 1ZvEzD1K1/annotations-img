const names: string[] = ['Harry Potter', 'Albert Enstain', 'Stephen Hawking', 'Glad Valakas', 'Adolf Hitler', 'Stepan Bandera', 'Josef Stalin', 'Wolfgan Messing', 'Harry Truman', 'pablo Escobare']

export default function randomAuthors() {
    return names[Math.floor(Math.random()*names.length)]
}