script='
BEGIN {
    cId = 0;
    id = 0;
    print "export const menus = ["
}

{
    if (NF == 1) {
        id = 0;
        if (cId > 0) {
            print "  ]}, ";
        }
        print "  { id:"++cId", name: \""$1"\", items: [";
    } else {
        print "    { id:"cId id++", name: \""$1"\", cost: "$2" },";
    }
}

END {
    print "  ]}";
    print "];";
}
'
mv menus.js menus.js.bak
awk -F'|' "$script" menus.list > menus.js
