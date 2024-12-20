<template>
    <Head>
        <title>Supply</title>
    </Head>

    <div class="row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>Supply</h3>
             <Link href="">Add Supply</Link>
        </div>
        <div class="bgc-white p-20 bd">
            <table class="table table-sm table-borderless table-striped table-hover">
                <thead>
                    <tr class="bg-secondary text-white">
                        <th></th>
                        <th>Item</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td></td>
                        <td>Jerry Cans</td>
                        <td>700 units</td>
                    </tr>
                    <tr >
                        <td></td>
                        <td>Hygeine Kits</td>
                        <td>700 pcs</td>
                    </tr>
                    <tr >
                        <td></td>
                        <td>Chlorine</td>
                        <td>3 drums</td>
                    </tr>
                    <tr >
                        <td></td>
                        <td>Colilert</td>
                        <td>1500 pcs</td>
                    </tr>
                    <tr >
                        <td></td>
                        <td>Collapsible</td>
                        <td>40 pcs</td>
                    </tr>


                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        test: Object
    }
}
</script>
