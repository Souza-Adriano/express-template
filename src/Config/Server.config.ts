import ENV from '../Core/Environment'

export default {
    debug: ENV<boolean>('DEBUG', false),
    port: ENV<number>('PORT', 3030)
}