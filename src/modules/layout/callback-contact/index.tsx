"use client"

import { Phone, XMark } from "@medusajs/icons"
import { Button, Container, Input, Label, Text } from "@medusajs/ui"
import { useState } from "react"

const CallbackContact = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[60] bg-ui-bg-base border shadow-elevation-flyout p-4 rounded-full hover:bg-ui-bg-base-hover transition-all duration-200 group"
      >
        <Phone className="text-ui-fg-base group-hover:scale-110 transition-transform" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ui-bg-overlay backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <Container className="relative w-full max-w-md p-8 bg-ui-bg-base shadow-elevation-modal rounded-rounded">
            <button
              className="absolute top-4 right-4 text-ui-fg-muted hover:text-ui-fg-base"
              onClick={() => setIsOpen(false)}
            >
              <XMark />
            </button>

            <div className="flex flex-col gap-y-4">
              <Text className="text-xlarge-plus text-ui-fg-base">
                Обратный звонок
              </Text>
              <Text className="text-small-regular text-ui-fg-subtle">
                Оставьте номер, и мы вам перезвоним.
              </Text>

              <div className="flex flex-col gap-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-ui-fg-subtle">
                    Ваше имя
                  </Label>
                  <Input
                    id="name"
                    placeholder="Иван"
                    className="bg-ui-bg-field"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-ui-fg-subtle">
                    Номер телефона
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+998 (__) ___-__-__"
                    className="bg-ui-bg-field"
                  />
                </div>

                <Button
                  className="w-full mt-2"
                  size="large"
                  onClick={() => {
                    setIsOpen(false)
                  }}
                >
                  Заказать звонок
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </>
  )
}

export default CallbackContact
