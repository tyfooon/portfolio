interface Command {
    command: string,
    stdin: string,
    stdout: string
}


export const useHistory = defineStore('history', () => {
    const history = ref<Command[]>([])


    const setStdin = (command: Command) => {
        history.value.push(command)
    }

    return {
        history,
        setStdin
    }


})