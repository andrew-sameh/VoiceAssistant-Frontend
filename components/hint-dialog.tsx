import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function HintsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-24 mx-auto">
          <Lightbulb className="w-6 h-6 mr-2" />
          Hints
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[45rem]">
        <DialogHeader>
          <DialogTitle>Hints</DialogTitle>
        </DialogHeader>
        <ul className="list-disc pl-5">
          <li>Ask about our services</li>
          <li>Ask about our prices</li>
          <li>Ask about our location</li>
          <li>Create a reservation</li>
          <li>Ask for recommendations while selecting the movies</li>
          <li>Check an already existing reservation</li>
          <li>Cancel a reservation</li>
        </ul>
      </DialogContent>
    </Dialog>
  );
}