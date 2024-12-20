<template>
    <Head>
        <title>Responder</title>
    </Head>

    <div class="row gap-20 masonry pos-r">
        <div class="peers fxw-nw jc-sb ai-c">
            <h3>Responders</h3>
             <Link href="">Add Responder</Link>
        </div>
        <div class="bgc-white p-20 bd">
            <table class="table table-sm table-borderless table-striped table-hover">
                <thead>
                    <tr class="bg-secondary text-white">
                        <th></th>
                        <th>Name</th>
                        <th>Office</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td></td>
                        <td>Jerry Cans</td>
                        <td>Provincial Health Office</td>
                    </tr>
                    <tr >
                        <td></td>
                        <td>Juan Dela Cruz</td>
                        <td>Municipal Health Office</td>
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
