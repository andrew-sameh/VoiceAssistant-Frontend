"use client";

import * as React from "react";
import { PopoverProps } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn, truncateText } from "@/lib/utils";
import { useMutationObserver } from "@/hooks/use-mutation-observer";
import { Button } from "@/components/ui/button";
import { selectedDocumentAtom, Doc } from "@/lib/store";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAtom } from "jotai";

export const types = [".pdf", ".docx", ".html"] as const;

export type DocType = (typeof types)[number];

// export interface Doc<Type = string> {
//   id: string
//   name: string
//   description: string
//   strengths?: string
//   type: Type
// }

interface DocSelectorProps extends PopoverProps {
  types: readonly DocType[];
  docs: Doc[];
  disabled: boolean;
}

export function DocSelector({ docs, types,disabled, ...props }: DocSelectorProps) {
  const [open, setOpen] = React.useState(false);
  //   const [selectedDoc, setSelectedDoc] = React.useState<Doc>(docs[0])
  const [selectedDoc, setSelectedDoc] = useAtom(selectedDocumentAtom);
//   setSelectedDoc(docs[0]);
  const [peekedDoc, setPeekedDoc] = React.useState<Doc>(docs[0]);
  //   auto-select the first doc if docs list is not empty
  React.useEffect(() => {
    if (!selectedDoc && docs.length > 0) {
      setSelectedDoc(docs[0]);
      setPeekedDoc(docs[0]);
    }
  }, [docs, selectedDoc, setSelectedDoc]);

  return (
    <div className="grid gap-2 w-72">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="document">Document</Label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The document you want the voice assistant to check while you are asking questions.
        </HoverCardContent>
      </HoverCard>
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            role="combobox"
            disabled={disabled}
            aria-expanded={open}
            aria-label="Select a doc"
            className="w-full justify-between"
          >
            {selectedDoc ? selectedDoc.name : "Select a document"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[250px] p-0">
          <HoverCard>
            {peekedDoc && (
              <HoverCardContent
                side="left"
                align="start"
                forceMount
                className="min-h-[280px]"
              >
                <div className="grid gap-2">
                  <h4 className="font-medium leading-none">{peekedDoc.name}</h4>
                  <div className="text-sm text-muted-foreground">
                    {/* truncate the overview */}
                    { peekedDoc.overview && truncateText(peekedDoc.overview, 300) }

                  </div>
                  {/* {peekedDoc.strengths ? (
                    <div className="mt-4 grid gap-2">
                      <h5 className="text-sm font-medium leading-none">
                        Strengths
                      </h5>
                      <ul className="text-sm text-muted-foreground">
                        {peekedDoc.strengths}
                      </ul>
                    </div>
                  ) : null} */}
                </div>
              </HoverCardContent>
            )}
            <Command loop>
              <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                <CommandInput placeholder="Search Docs..." />
                <CommandEmpty>No Docs found.</CommandEmpty>
                <HoverCardTrigger />
                {types.map((type) => (
                  <CommandGroup key={type} heading={type}>
                    {docs
                      .filter((doc) => doc.type === type)
                      .map((doc) => (
                        <DocItem
                          key={doc.id}
                          doc={doc}
                          isSelected={selectedDoc?.id === doc.id}
                          onPeek={(doc) => setPeekedDoc(doc)}
                          onSelect={() => {
                            setSelectedDoc(doc);
                            setOpen(false);
                          }}
                        />
                      ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface DocItemProps {
  doc: Doc;
  isSelected: boolean;
  onSelect: () => void;
  onPeek: (doc: Doc) => void;
}

function DocItem({ doc, isSelected, onSelect, onPeek }: DocItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  useMutationObserver(ref, (mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "aria-selected" &&
        ref.current?.getAttribute("aria-selected") === "true"
      ) {
        onPeek(doc);
      }
    });
  });

  return (
    <CommandItem
      key={doc.id}
      onSelect={onSelect}
      ref={ref}
      className="data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
    >
      {doc.name}
      <Check
        className={cn("ml-auto", isSelected ? "opacity-100" : "opacity-0")}
      />
    </CommandItem>
  );
}
