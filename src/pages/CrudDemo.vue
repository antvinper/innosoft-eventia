<template>
	<div class="grid crud-demo">

		<div class="col-12">
			<div class="card">
				<Toast/>
				<Toolbar class="mb-4">
					<template v-slot:start>
						<div class="my-2">
							<Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
							<Button label="Borrar" icon="pi pi-trash" class="p-button-danger" @click="confirmBorrarSelected" :disabled="!selectedPeticionesPublicacion || !selectedPeticionesPublicacion.length" />
						</div>
					</template>

					<template v-slot:end>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="peticionesPublicacion" v-model:selection="selectedPeticionesPublicacion" dataKey="id" :paginator="true" :rows="10" :filters="filters"
							paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
							currentPageReportTemplate="Mostrando de {first} a {last} de un total de {totalRecords} peticiones" responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Peticiones de publicación de eventos</h5>
							<span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
					<Column field="idEvento" header="ID del evento" :sortable="true">
						<template #body="slotProps">
							<span class="p-column-title">ID del evento</span>
							{{slotProps.data.idEvento}}
						</template>
					</Column>
					<Column field="titulo" header="Título" :sortable="true">
						<template #body="slotProps">
							<span class="p-column-title">Título</span>
							{{slotProps.data.titulo}}
						</template>
					</Column>
					<Column field="descripcion" header="Descripción" :sortable="true">
						<template #body="slotProps">
							<span class="p-column-title">Descripción</span>
							{{slotProps.data.descripcion}}
						</template>
					</Column>
					<Column field="inicio" header="Inicio" :sortable="true">
						<template #body="slotProps">
							<span class="p-column-title">Descripción</span>
							{{new Date(slotProps.data.inicio).toLocaleString()}}
						</template>
					</Column>
					<Column field="fin" header="Fin" :sortable="true">
						<template #body="slotProps">
							<span class="p-column-title">Descripción</span>
							{{new Date(slotProps.data.fin).toLocaleString()}}
						</template>
					</Column>
					<Column field="imagen" header="Imagen">
						<template #body="slotProps">
							<span class="p-column-title">Imagen</span>
							<img v-if="slotProps.data.imagen" :src="slotProps.data.imagen" class="shadow-2" width="100" />
						</template>
					</Column>
					<Column field="estado" header="Estado" :sortable="true">
						<template #body="slotProps">
							<span class="p-column-title">Estado de publicación</span>
							<span :class="'product-badge estado-' + (slotProps.data.estado ? slotProps.data.estado.toLowerCase() : '')">{{slotProps.data.estado}}</span>
						</template>
					</Column>
					<Column field="actions" header="Actions">
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning mr-2" @click="confirmBorrarProduct(slotProps.data)" />
							
							<Button icon="pi pi-twitter" class="p-button-rounded mr-2" @click="publicarEnTwitter()" />
							<Button icon="pi pi-facebook" class="p-button-rounded mr-2" @click="publicarEnFacebook()" />
							<Button icon="pi pi-telegram" class="p-button-rounded mr-2 mt-2" @click="publicarEnTelegram()" />
							<Button icon="pi pi-at" class="p-button-rounded mt-2" @click="publicarEnGmail()" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Product Details" :modal="true" class="p-fluid">
					<img :src="'imagenes/product/' + product.imagen" :alt="product.imagen" v-if="product.imagen" width="150" class="mt-0 mx-auto mb-5 block shadow-2" />
					<div class="field">
						<label for="titulo">Título</label>
						<InputText id="titulo" v-model.trim="product.titulo" required="true" autofocus :class="{'p-invalid': submitted && !product.titulo}" />
						<small class="p-invalid" v-if="submitted && !product.titulo">El título es obligatorio.</small>
					</div>
					<div class="field">
						<label for="description">Description</label>
						<Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
					</div>

					<div class="field">
						<label for="estado" class="mb-3">Estado de publicación</label>
						<Dropdown id="estado" v-model="product.estado" :options="estados" optionLabel="label" placeholder="Selecciona un estado">
							<template #value="slotProps">
								<div v-if="slotProps.value && slotProps.value.value">
									<span :class="'product-badge estado-' +slotProps.value.value">{{slotProps.value.label}}</span>
								</div>
								<div v-else-if="slotProps.value && !slotProps.value.value">
									<span :class="'product-badge estado-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
								</div>
								<span v-else>
									{{slotProps.placeholder}}
								</span>
							</template>
						</Dropdown>
					</div>

					<div class="field">
						<label class="mb-3">Category</label>
						<div class="formgrid grid">
							<div class="field-radiobutton col-6">
								<RadioButton id="category1" name="category" value="Accessories" v-model="product.category" />
								<label for="category1">Accessories</label>
							</div>
							<div class="field-radiobutton col-6">
								<RadioButton id="category2" name="category" value="Clothing" v-model="product.category" />
								<label for="category2">Clothing</label>
							</div>
							<div class="field-radiobutton col-6">
								<RadioButton id="category3" name="category" value="Electronics" v-model="product.category" />
								<label for="category3">Electronics</label>
							</div>
							<div class="field-radiobutton col-6">
								<RadioButton id="category4" name="category" value="Fitness" v-model="product.category" />
								<label for="category4">Fitness</label>
							</div>
						</div>
					</div>

					<div class="formgrid grid">
						<div class="field col">
							<label for="price">Price</label>
							<InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" />
						</div>
						<div class="field col">
							<label for="quantity">Quantity</label>
							<InputNumber id="quantity" v-model="product.quantity" integeronly />
						</div>
					</div>
					<template #footer>
						<Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
					</template>
				</Dialog>

				<Dialog v-model:visible="borrarProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="product">¿Seguro que quieres borrar el evento: "<b>{{product.titulo}}</b>"?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="borrarProductDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="borrarProduct" />
					</template>
				</Dialog>

				<Dialog v-model:visible="borrarPeticionesPublicacionDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="product">¿Seguro que deseas borrar esta petición de publicacion?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="borrarPeticionesPublicacionDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="borrarSelectedPeticionesPublicacion" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
import {FilterMatchMode} from 'primevue/api';

export default {
	data() {
		return {
			peticionesPublicacion: null,
			peticionesPublicacionDialog: false,
			borrarProductDialog: false,
			borrarPeticionesPublicacionDialog: false,
			product: {},
			selectedPeticionesPublicacion: null,
			filters: {},
			submitted: false,
			estados: [
				{label: 'PUBLICADO', value: 'publicado'},
				{label: 'PENDIENTE', value: 'pendiente'},
				{label: 'DENEGADO', value: 'denegado'}
			],
			overlayMenuItems: [
					{
						label: 'Publicar en Twitter',
						icon: 'pi pi-twitter',
                        command: () => {this.publicarEnTwitter()}
					},
					{
						label: 'Publicar en Facebook',
						icon: 'pi pi-facebook',
                        command: () => {this.publicarEnFacebook()}
					},
					{
						label: 'Publicar en Telegram',
						icon: 'pi pi-telegram',
                        command: () => {this.publicarEnTelegram()}
					},
					{
						label: 'Publicar en Gmail',
						icon: 'pi pi-at',
                        command: () => {this.publicarEnGmail()}
					},
				]
		}
	},
	servicioPeticionPublicaciones: null,
	created() {
		this.initFilters();
	},
	mounted() {
		this.axios.get('/peticionesPublicacion')
		.then((response) => {
			console.log(response.data)
			this.peticionesPublicacion = response.data;
		})
		.catch((e)=>{
			console.log('error' + e);
		})
	},
	methods: {
		formatCurrency(value) {
			if(value)
				return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
			return;
		},
		openNew() {
			this.product = {};
			this.submitted = false;
			this.productDialog = true;
		},
		hideDialog() {
			this.productDialog = false;
			this.submitted = false;
		},
		saveProduct() {
			this.submitted = true;
			if (this.product.titulo.trim()) {
			if (this.product.id) {
				this.product.estado = this.product.estado.value ? this.product.estado.value: this.product.estado;
				this.peticionesPublicacion[this.findIndexById(this.product.id)] = this.product;
				this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
				}
				else {
					this.product.id = this.createId();
					this.product.eventId = this.createId();
					this.product.imagen = 'product-placeholder.svg';
					this.product.estado = this.product.estado ? this.product.estado.value : 'INSTOCK';
					this.peticionesPublicacion.push(this.product);
					this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
				}
				this.productDialog = false;
				this.product = {};
			}
		},
		editProduct(product) {
			this.product = {...product};
			this.productDialog = true;
		},
		confirmBorrarProduct(product) {
			this.product = product;
			this.borrarProductDialog = true;
		},
		borrarProduct() {
			this.peticionesPublicacion = this.peticionesPublicacion.filter(val => val.id !== this.product.id);
			this.borrarProductDialog = false;
			this.product = {};
			this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Borrard', life: 3000});
		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.peticionesPublicacion.length; i++) {
				if (this.peticionesPublicacion[i].id === id) {
					index = i;
					break;
				}
			}
			return index;
		},
		createId() {
			let id = '';
			var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			for ( var i = 0; i < 5; i++ ) {
				id += chars.charAt(Math.floor(Math.random() * chars.length));
			}
			return id;
		},
		exportCSV() {
			this.$refs.dt.exportCSV();
		},
		confirmBorrarSelected() {
			this.borrarPeticionesPublicacionDialog = true;
		},
		borrarSelectedPeticionesPublicacion() {
			this.peticionesPublicacion = this.peticionesPublicacion.filter(val => !this.selectedPeticionesPublicacion.includes(val));
			this.borrarPeticionesPublicacionDialog = false;
			this.selectedPeticionesPublicacion = null;
			this.$toast.add({severity:'success', summary: 'Successful', detail: 'PeticionesPublicacion Borrar', life: 3000});
		},
		initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        },
		toggleMenu(event) {
			this.$refs.menu.toggle(event);
		}
	}
}
</script>

<style scoped lang="scss">
	.product-badge {
		border-radius: 2px;
		padding: .25em .5rem;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		letter-spacing: .3px;

		&.estado-publicado {
			background: #C8E6C9;
			color: #256029;
		}

		&.estado-pendiente {
			background: #FEEDAF;
			color: #8A5340;
		}

		&.estado-denegado {
			background: #FFCDD2;
			color: #C63737;
		}
	}
</style>
