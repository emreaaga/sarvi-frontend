import { Heading, Text } from "@medusajs/ui"
import Button from "@modules/common/components/button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-center justify-between font-sans">
      <div>
        <Heading
          level="h2"
          className="text-[16px] uppercase tracking-wider font-bold text-black"
        >
          Уже есть аккаунт?
        </Heading>
        <Text className="text-[12px] text-gray-500 mt-1 lowercase tracking-tight">
          войдите, чтобы покупки были удобнее.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button
            variant="secondary"
            className="h-10 px-8"
            data-testid="sign-in-button"
          >
            войти
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
