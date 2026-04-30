import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  return (
    <div className="font-sans">
      <div className="pb-6 flex items-center">
        <Heading className="text-[24px] uppercase tracking-[0.2em] font-bold text-black">
          корзина
        </Heading>
      </div>
      <Table>
        <Table.Header className="border-t-0 border-b border-gray-100">
          <Table.Row className="text-gray-400 uppercase text-[10px] tracking-widest">
            <Table.HeaderCell className="!pl-0">товар</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>кол-во</Table.HeaderCell>
            <Table.HeaderCell className="hidden small:table-cell">
              цена
            </Table.HeaderCell>
            <Table.HeaderCell className="!pr-0 text-right">
              итого
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items
            ? items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      currencyCode={cart?.currency_code}
                    />
                  )
                })
            : repeat(5).map((i) => {
                return <SkeletonLineItem key={i} />
              })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ItemsTemplate
