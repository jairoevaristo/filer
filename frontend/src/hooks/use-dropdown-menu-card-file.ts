import { useState } from "react"

export const useDropdownMenuCardFile = () => {
    const [openShareFile, setOpenShareFile] = useState(false)
    const [openViewDetails, setOpenViewDetails] = useState(false)
    const [openDeleteFile, setOpenDeleteFile] = useState(false)

    const handleOpenShareFile = () => {
        setOpenShareFile((prevState: boolean) => !prevState)
    }

    const handleOpenViewDetails = () => {
        setOpenViewDetails((prevState: boolean) => !prevState)
    }

    const handleOpenDeleteFile = () => {
        setOpenDeleteFile((prevState: boolean) => !prevState)
    }

    return {
        openShareFile,
        openViewDetails,
        openDeleteFile,
        handleOpenShareFile,
        handleOpenViewDetails,
        handleOpenDeleteFile,
    }
}