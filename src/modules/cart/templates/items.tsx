import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
  dict: any
}

const ItemsTemplate = ({ cart, dict }: ItemsTemplateProps) => {
  const items = cart?.items

  return (
    <div className="font-sans">
      <div className="pb-6 flex items-center">
        <Heading className="text-[24px] uppercase tracking-[0.2em] font-bold text-black">
          {dict.title}
        </Heading>
      </div>
      <Table>
        <Table.Header className="border-t-0 border-b border-gray-100">
          <Table.Row className="text-gray-400 uppercase text-[10px] tracking-widest">
            <Table.HeaderCell className="!pl-0">
              {dict.table_item}
            </Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>{dict.table_quantity}</Table.HeaderCell>
            <Table.HeaderCell className="hidden small:table-cell">
              {dict.table_price}
            </Table.HeaderCell>
            <Table.HeaderCell className="!pr-0 text-right">
              {dict.table_total}
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
