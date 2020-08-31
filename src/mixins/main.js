export default {
    methods: {
        getMaleTitleById: function (male) {
            let males = this.$store.state.productMale;

            for(let i = 0; i < males.length; i++){
                if (males[i].id === male){
                    return males[i].title;
                }
            }

            return false;
        },
        getTitleDataForMoreProducts: function (categoryId = 0) {
            let categoryData = {
                men: { title: 'Мужчины', maleID: 2},
                women: { title: 'Женщины' ,maleID: 1},
                default: { title: 'Все товары', maleID: 0},
            };
            if (categoryId) {
                let categoryName = this.getMaleTitleById(categoryId);
                if (categoryName) {
                    return categoryData[categoryName.toLowerCase()]
                }
            }

            let category = this.$route.params.name;
            if(category !== undefined && category !== null && typeof categoryData[category] !== undefined){
                return categoryData[category];
            }
            return categoryData.default;
        },
    }
}
