import {Button} from "@/components/ui/button"
export default  function({company,title,createdOn,name}:props) {
    return (
        <div className='w-full border-2 border-white rounded-lg justify-center'>
            <div className='flex flex-wrap justify-between p-2 text-xl'>
                <div>
                    {name}
                </div>
                <div>
                    {company}
                </div>
                <div>
                    {title}
                </div>
                <div>
                    {createdOn.toISOString().split("T")[0]}
                </div>
                <div>
                    <Button variant="outline" className="bg-white text-slate-900" >Open</Button>
                </div>
            </div>
        </div>
    )
}
interface props {
    company:string,
    title:string,
    createdOn:Date,
    name:string
}