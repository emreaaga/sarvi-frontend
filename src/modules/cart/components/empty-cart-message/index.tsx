import { Heading, Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="py-48 px-2 flex flex-col justify-center items-center text-center font-sans"
      data-testid="empty-cart-message"
    >
      <Heading
        level="h1"
        className="text-[24px] uppercase tracking-[0.2em] font-bold text-black mb-4"
      >
        ваша корзина пуста
      </Heading>

      <Text className="text-[12px] uppercase tracking-widest text-gray-500 mt-2 mb-8 max-w-[28rem] leading-relaxed">
        кажется, вы еще ничего не выбрали. загляните в наш каталог, чтобы найти
        что-то особенное для себя.
      </Text>

      <div className="group">
        <InteractiveLink href="/store">перейти в каталог</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
