module.exports = {
    prompts: {
        name: {
            type: 'string',
            required: true,
            message: 'Project name',
        },
        description: {
            type: 'string',
            required: false,
            message: 'Project description',
            default: 'A Vue.js Project',
        },
        version: {
            type: 'string',
            required: false,
            message: 'Project version',
            default: '1.0.0',
        },
        author: {
            type: 'string',
            message: 'Author',
        },
        autoInstall: {
            type: 'list',
            message:
                'Should we run `npm install` for you after the project has been created? (recommended)',
            choices: [
                {
                    name: 'Yes, use NPM',
                    value: 'npm',
                    short: 'npm',
                },
                {
                    name: 'Yes, use Yarn',
                    value: 'yarn',
                    short: 'yarn',
                },
                {
                    name: 'No, I will handle that myself',
                    value: false,
                    short: 'no',
                },
            ],
        }
    },
}