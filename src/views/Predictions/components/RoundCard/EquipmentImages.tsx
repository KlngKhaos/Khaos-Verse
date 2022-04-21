import React from 'react'
import Equipment from './Equipment'

interface EquipmentImagesProps {
    data: any,
}


const EquipmentImages: React.FC<EquipmentImagesProps> = ({ data }) => {

    return (
        <>
            {
                data?.map(element => {
                    if (element.type === "battle") {
                        return (
                            <Equipment data={element} />
                        )
                    }
                    if (element.type === "defense") {
                        return (
                            <Equipment data={element} />
                        )
                    }
                    if (element.type === "animal") {
                        return (
                            <Equipment data={element} />
                        )
                    }
                })
            }
        </>

    )
}

export default EquipmentImages