import { useParams } from "next/navigation";

export default function ItemScreen() {
    const params = useParams<{ id: string }>();
    
}