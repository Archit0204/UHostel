import Link from "next/link"

type DashTileProps = {
    title: string,
    description: string,
    route: string
}

export default function DashTile({title, description, route}: DashTileProps) {
    return (
        <div className="flex flex-col border rounded-lg p-3 h-[170px] md:h-[140px]">
            <Link href={`/${route}`}><h3 className="text-customRed underline cursor-pointer font-semibold tracking-wide">{title}</h3></Link>
            <p className="text-sm md:text-xs font-extralight">{description}</p>
        </div>
    )
}