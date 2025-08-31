import type { ListItemNode, ListNode, ParagraphNode, TextNode } from '@/types/interface'

/** A union type for any node that can appear inside the root's 'children' array. */
export type RootChildNode = ParagraphNode | ListNode
/** A union of all possible nodes that the recursive renderer can handle. */
export type RenderableNode = ParagraphNode | ListNode | ListItemNode | TextNode
