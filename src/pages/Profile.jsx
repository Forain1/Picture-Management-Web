import ProfileSidebar from "../components/ProfileSidebar"
import PhotoWall from "../components/PhotoWall"
import { Box } from "@mui/material"

export default function Profile() {
    return (
        <Box sx={{ display: "flex" }}>
            <Box sx={{ width: 240, flexShrink: 0 }}>
                <ProfileSidebar />
            </Box>
            <Box sx={{ flex: 1 }}>
                <PhotoWall />
            </Box>
        </Box>
    )
}