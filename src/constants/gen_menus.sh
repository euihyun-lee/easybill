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
        commaPos = length($2) - 3;
        if (commaPos > 0) {
            costText = substr($2, 1, commaPos)","substr($2, commaPos + 1)"원";
        } else {
            costText = $2"원";
        }
        print "    { id:"cId id++", name: \""$1"\", cost: "$2", costText: \""costText"\" },";
    }
}

END {
    print "  ]}";
    print "];";
}
'
mv menus.js menus.js.bak
awk -F'|' "$script" menus.list > menus.js
