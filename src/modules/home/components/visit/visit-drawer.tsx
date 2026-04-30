"use client"

import { Drawer, Heading, Input, Label, toast } from "@medusajs/ui"
import Button from "@modules/common/components/button"

interface VisitDrawerProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const VisitDrawer = ({ open, setOpen }: VisitDrawerProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast("Успешно", {
      description: "Заявка отправлена. Мы свяжемся с вами в ближайшее время.",
    })

    setOpen(false)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Content className="max-w-[400px] bg-white p-8 z-[9999]">
        <Drawer.Header>
          <Drawer.Title asChild>
            <Heading
              level="h2"
              className="uppercase tracking-widest font-bold text-xl"
            >
              Запись в шоурум
            </Heading>
          </Drawer.Title>
        </Drawer.Header>

        <div className="flex flex-col gap-y-8 mt-10">
          <p className="text-[12px] text-gray-500 leading-relaxed uppercase tracking-tight">
            Оставьте ваши данные, и мы свяжемся с вами для уточнения времени.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2">
              <Label
                htmlFor="drawer-name"
                className="text-[10px] uppercase font-bold text-gray-400"
              >
                Имя
              </Label>
              <Input
                id="drawer-name"
                placeholder="Введите ваше имя"
                required
                className="bg-gray-50 border-none h-11 focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <Label
                htmlFor="drawer-phone"
                className="text-[10px] uppercase font-bold text-gray-400"
              >
                Телефон
              </Label>
              <Input
                id="drawer-phone"
                placeholder="+998"
                required
                className="bg-gray-50 border-none h-11 focus:ring-1 focus:ring-black"
              />
            </div>

            <Button type="submit" variant="primary" className="mt-4 h-12">
              Отправить заявку
            </Button>
          </form>
        </div>
      </Drawer.Content>
    </Drawer>
  )
}

export default VisitDrawer
