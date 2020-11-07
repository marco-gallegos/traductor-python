from anytree import Node, RenderTree


root = Node("+")

izq = Node("num", parent=root)
Node("5", parent=izq)
#Node("3", parent=izq)

der = Node("(", parent=root)
der1 = Node("num", parent=root)
Node("5", parent=der1)
der2 = Node("+", parent=root)
der3 = Node("num", parent=root)
Node("5", parent=der3)
der4 = Node(")", parent=root)

print("5+(5+5)")

for pre, fill, node in RenderTree(root):
    print("%s%s" % (pre, node.name))
