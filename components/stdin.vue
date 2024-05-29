<template>
    <div class="flex flex-row gap-2">
        <h1 class="antialiased font-ubuntu font-semibold text-green-400">
            <span>guest@typhooon</span>
            <span class="text-white">:</span>
            <span class="text-blue-500">~</span>
            <span class="text-white">$</span>
        </h1>
        <input ref="inputElement" @keydown="handleCommand" v-model="input" class="bg-transparent font-ubuntu font-medium text-white focus:outline-none"/>
        <!-- <div class="flex flex-row items-center">
            <p class="font-ubuntu font-medium text-white">{{ input }}</p>
            <span class="w-1.5 h-4 bg-white"></span>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { commands } from '~/utils/commands';

const store = useHistory()

let inputElement: HTMLElement
let historyIndex = -1 
const input = ref<string>('')

onMounted(async () => {
    inputElement.focus()
    window.addEventListener('click', handleWindow)
    
    if(store.history.length === 0) {
        input.value = 'banner'
        const stdin = input.value
        const [ command, ...args ] = input.value.split(' ')
        const commandFunc = commands[command]

        if(commandFunc) {
            const stdout = await commandFunc(args)
            store.setStdin({command, stdin, stdout})
        }
        input.value = ''
    }
    //
})

onBeforeUnmount(() => {
    window.removeEventListener('click', handleWindow)
})

onUpdated(() => {
    inputElement.scrollIntoView({behavior: 'instant', block: 'end'})
})

const handleWindow = (event: MouseEvent) => {
    inputElement.focus()
}

const handleCommand = async (event: KeyboardEvent) => {
    if(event.key === 'Enter'){
        const stdin = input.value
        const [ command, ...args ] = input.value.split(' ')

        const commandFunc = commands[command]


        if(commandFunc) {
            if(command === 'clear') {
                store.history = []
            } else
            {
                const stdout = await commandFunc(args)
                store.setStdin({command, stdin, stdout})
            }

        }
        else {
            const stdout = `${command}: command not found`
            store.history.push({command, stdin, stdout})
        }
        
        input.value = ''
    }

    else if(event.key === 'ArrowUp'){
        if(historyIndex < store.history.length - 1){ 
            historyIndex++
            input.value = store.history[store.history.length - 1 - historyIndex].stdin
        }
        event.preventDefault();
    }

    else if(event.key === 'ArrowDown') {
        if(historyIndex > -1) {
            historyIndex --
            input.value = historyIndex >= 0 ? store.history[store.history.length - 1 - historyIndex].command : ''
        }
    }

    else if(event.key === 'Tab') {
        event.preventDefault()
        const autoComplete = Object.keys(commands).find((cmd) =>
            cmd.startsWith(input.value)
        )

        if(autoComplete) {
            input.value = autoComplete
        }
    }

    else if(event.ctrlKey && event.key === 'l'){
        event.preventDefault()

        store.history = []
    }

}

</script>