import {POST} from './constant'
const Subscription = {
    count: {
        subscribe(parent,args,{pubSub},info) {
            let count = 0;
            setInterval(()=> {
                count++;
                pubSub.publish('count',{
                    count : count
                })

            },1000)

            return pubSub.asyncIterator('count')
        }
    },
    comment: {
        subscribe(parent, args, {pubSub},info) {
            const {id} = args;
            return pubSub.asyncIterator(`comment ${id}`)
        }
    },
    post : {
        subscribe(parent,args,{pubSub},info){
            return pubSub.asyncIterator(POST)
        }
    }
}

export {Subscription as default}