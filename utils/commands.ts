
// const hostname = window.location.hostname

export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
    clear: () => '',
    hostname: () => 'typhooon.com',
    whoami: () => `
    Hey, I'm Typhooon!
    I'm a self-taught programmer with an high interest in cybersecurity
    `,
    date: () => new Date().toLocaleString(),
    echo: (args: string[]) => args.join(' '),
    sudo: (args: string[]) => {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    
        return `Permission denied: unable to run the command '${args[0]}' as root.`;
    },

    email: () => `typhooon25@gmail.com`,
    skills: () => `
    Python
    Django
    FastAPI
    Javascript
    Typescript
    NodeJS
    Nuxt
    Vue
    `,
    help: () => `
    GNU Bash, version 5.2.21(1)-release(x86_64-pc-linux-gnu)
    These shell comamnds are defined internally. Type 'help' to see the list.

    Available commands:

    hostname    Hostname
    whoami      Who is Ivo
    echo        Print a string
    sudo        Run a service as superuser
    email       Email for contact
    skills      See what i know
    video       View YouTube videos
    social      Display social networks
    secret      Find the password
    projects    View coding projects
    help        You obviously already know what this does
    clear       Clear Terminal
    `,
    banner: () => `
    ┓         
    ╋┓┏┏┓┣┓┏┓┏┓┏┓┏┓
    ┗┗┫┣┛┛┗┗┛┗┛┗┛┛┗
      ┛┛                                     
  
    Welcome to my interactive web terminal.
    For a list of available commands, type 'help'.
    `,
}