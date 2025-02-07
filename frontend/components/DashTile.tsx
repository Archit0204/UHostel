
type DashTileProps = {
    title: string,
    description: string,
}

export default function DashTile({title, description}: DashTileProps) {
    return (
        <div className="flex flex-col border rounded-lg p-3 h-[170px] md:h-[140px]">
            <h3 className="text-customRed underline font-semibold tracking-wide">{title}</h3>
            <p className="text-sm md:text-xs font-extralight">{description}</p>
        </div>
    )
}